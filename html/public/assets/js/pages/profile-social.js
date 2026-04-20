/* ── Profile Social Page ─────────────────────────────────── */
(function() {
  'use strict';

  var following = false;

  window.toggleFollow = function() {
    following = !following;
    var btn = document.getElementById('followBtn');
    btn.textContent = following ? 'Following' : 'Follow';
    btn.className = 'follow-btn ' + (following ? 'following' : 'not-following');
    App.toast.success(following ? 'Followed!' : 'Unfollowed', following ? 'You are now following John Doe.' : 'You unfollowed John Doe.');
  };

  // Profile tab switching
  document.querySelectorAll('.profile-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.profile-tab').forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  window.likePost = function(el) {
    var span = el.querySelector('span:last-child');
    var cur = parseInt(span.textContent);
    if (el.dataset.liked) { span.textContent = (cur - 1) + ' Likes'; delete el.dataset.liked; el.classList.remove('bm-text-primary-plain'); }
    else { span.textContent = (cur + 1) + ' Likes'; el.dataset.liked = '1'; el.classList.add('bm-text-primary-plain'); }
  };

  window.bookmarkPost = function(el) {
    var icon = el.querySelector('span');
    if (icon.textContent === 'bookmark_border') { icon.textContent = 'bookmark'; el.classList.add('bm-text-primary-plain'); App.toast.success('Saved','Post saved to bookmarks.'); }
    else { icon.textContent = 'bookmark_border'; el.classList.remove('bm-text-primary-plain'); }
  };

})();
