// CONTENT PROTECTION

// Disable right click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Disable keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl+S (save), Ctrl+U (view source), Ctrl+P (print)
  if (e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'p')) {
    e.preventDefault();
  }
  // F12 (developer tools)
  if (e.key === 'F12') {
    e.preventDefault();
  }
  // Ctrl+Shift+I (developer tools)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
  }
});

// Disable drag
document.addEventListener('dragstart', function(e) {
  e.preventDefault();
});


// SEARCH
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query.length === 0) return;
  window.location.href = '/cauta?q=' + encodeURIComponent(query);
}

// Allow search on Enter key
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }
});