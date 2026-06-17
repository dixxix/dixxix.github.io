// Табы меню
(function() {
  const tabsBtns = document.querySelectorAll('.tabs__btn');
  
  if (tabsBtns.length) {
    tabsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Убираем активный класс у всех кнопок
        tabsBtns.forEach(b => b.classList.remove('is-active'));
        // Добавляем активный класс текущей кнопке
        btn.classList.add('is-active');
        
        // Скрываем все табы
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('is-active');
        });
        
        // Показываем выбранный таб
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
          activeTab.classList.add('is-active');
        }
      });
    });
  }
})();

// Обработка отправки формы
(function() {
  const bookingForm = document.getElementById('bookingForm');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Спасибо за заявку! Мы свяжемся с вами для подтверждения бронирования.');
      bookingForm.reset();
    });
  }
})();

// Плавная анимация для ссылок навигации (фикс для sticky header)
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();