// Анимация кружки при скролле - улучшенная плавная версия
(function() {
  const scrollingCup = document.getElementById('scrollingCup');
  
  if (!scrollingCup) return;
  
  let ticking = false;
  let lastScrollY = 0;
  
  function updateCupAnimation() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    const heroHeight = heroSection.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Максимальная дистанция прокрутки (высота hero)
    const maxScroll = heroHeight - windowHeight;
    
    // Прогресс скролла от 0 до 1
    let scrollProgress = maxScroll > 0 ? scrolled / maxScroll : 0;
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);
    
    // Используем ease-out для более плавного движения в конце
    const easedProgress = 1 - Math.pow(1 - scrollProgress, 1.5);
    
    // Вращение: до 2 полных оборотов (720 градусов)
    const rotation = easedProgress * -720;
    
    // Перемещение влево: до 500px
    const translateX = easedProgress * -500;
    
    // Применяем трансформацию
    scrollingCup.style.transform = `translateY(-50%) translateX(${translateX}px) rotate(${rotation}deg)`;
    
    // Плавное исчезновение
    if (scrollProgress > 0.6) {
      const fadeProgress = (scrollProgress - 0.6) / 0.4;
      scrollingCup.style.opacity = 0.6 * (1 - fadeProgress);
    } else {
      scrollingCup.style.opacity = 0.6;
    }
    
    lastScrollY = scrolled;
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateCupAnimation);
      ticking = true;
    }
  }
  
  // Также обновляем при изменении размера окна
  function onResize() {
    updateCupAnimation();
  }
  
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);
  
  // Запускаем один раз для установки начального состояния
  updateCupAnimation();
})();

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