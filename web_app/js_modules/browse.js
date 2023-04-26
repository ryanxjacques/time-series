function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const contentContainers = document.querySelectorAll('.content-container');
  
    tabs.forEach(tab => {
      if (tab.id.includes(tabName)) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  
    contentContainers.forEach(content => {
      if (content.id.includes(tabName)) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  }