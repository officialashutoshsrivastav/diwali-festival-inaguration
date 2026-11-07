import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeRecipientName,
  formatDisplayName,
  parsePersonalizationFromSearch,
  resolveInitialSceneFromSearch,
  buildPersonalizedUrl,
  buildSocialShareLinks,
  getNextScene,
  getPrevScene,
  getBaseUrl,
  DEFAULT_RECIPIENT_NAME,
} from './shareUtils';

test('sanitizeRecipientName strips unsafe characters and collapses spaces', () => {
  assert.equal(sanitizeRecipientName('  Ashutosh   Srivastav  '), 'Ashutosh Srivastav');
  assert.equal(sanitizeRecipientName('<script>Priya</script>'), 'scriptPriya/script');
  assert.equal(sanitizeRecipientName('   '), null);
  assert.equal(sanitizeRecipientName(null), null);
});

test('parsePersonalizationFromSearch handles URLSearchParams with custom and missing names', () => {
  const withName = parsePersonalizationFromSearch('?name=Ashutosh%20Srivastav');
  assert.equal(withName.hasCustomName, true);
  assert.equal(withName.displayName, 'Ashutosh Srivastav');
  assert.equal(withName.uppercaseName, 'ASHUTOSH SRIVASTAV');

  const withoutName = parsePersonalizationFromSearch('');
  assert.equal(withoutName.hasCustomName, false);
  assert.equal(withoutName.displayName, DEFAULT_RECIPIENT_NAME);
  assert.equal(withoutName.uppercaseName, 'ASHUTOSH SRIVASTAV');
});

test('buildPersonalizedUrl uses centralized base URL and encodes recipient names safely', () => {
  const base = getBaseUrl();
  const url = buildPersonalizedUrl(`${base}?old=1`, 'Priya Sharma & Family');
  assert.equal(url, `${base}/?name=Priya%20Sharma%20%26%20Family`);

  const defaultBaseUrl = buildPersonalizedUrl(undefined, 'Priya');
  assert.equal(defaultBaseUrl, `${base}/?name=Priya`);

  const fallbackUrl = buildPersonalizedUrl(base, '   ');
  assert.equal(fallbackUrl, `${base}/`);
});

test('resolveInitialSceneFromSearch and scene navigation transitions work step by step', () => {
  assert.equal(resolveInitialSceneFromSearch(''), 'intro');
  assert.equal(resolveInitialSceneFromSearch('?autostart=1'), 'diwali');
  assert.equal(resolveInitialSceneFromSearch('?scene=curtains&name=Priya'), 'curtains');
  assert.equal(getNextScene('intro'), 'reveal');
  assert.equal(getNextScene('diwali'), 'cards');
  assert.equal(getPrevScene('cards'), 'diwali');
});

test('buildSocialShareLinks produces valid encoded social share URLs', () => {
  const targetUrl = buildPersonalizedUrl(getBaseUrl(), 'Priya');
  const links = buildSocialShareLinks(targetUrl, 'Priya');
  assert.ok(links.whatsappUrl.includes(encodeURIComponent(targetUrl)));
  assert.ok(links.telegramUrl.includes(encodeURIComponent(targetUrl)));
  assert.ok(links.twitterUrl.includes(encodeURIComponent(targetUrl)));
  assert.ok(links.shareText.includes('Priya'));
});

test('formatDisplayName capitalizes words cleanly', () => {
  assert.equal(formatDisplayName('priya sharma'), 'Priya Sharma');
  assert.equal(formatDisplayName(null), DEFAULT_RECIPIENT_NAME);
});
