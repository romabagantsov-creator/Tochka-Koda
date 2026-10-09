/* ============ ГОД В ФУТЕРЕ ============ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============ ШАПКА ПРИ СКРОЛЛЕ ============ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============ МОБИЛЬНОЕ МЕНЮ ============ */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ============ АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ ============ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============ АНИМИРОВАННЫЙ ФОН С КОДОМ ============ */
const codeLinesEl = document.getElementById('codeLines');
const codeSnippets = [
    'def hello():',
    '    print("Точка Кода")',
    'for i in range(12):',
    '    print(i, "занятие")',
    'class Student:',
    '    def learn(self):',
    '        return "Python"',
    'if level > 10:',
    '    print("Победа!")',
    'import pygame',
    'while True:',
    '    code()',
];

if (codeLinesEl) {
    let text = '';
    for (let row = 0; row < 14; row++) {
        const line = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const indent = '    '.repeat(Math.floor(Math.random() * 3));
        text += indent + line + '\n';
    }
    codeLinesEl.textContent = text;
}

/* ============ ПЛАВНАЯ ПРОКРУТКА ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ============ КНОПКА НАВЕРХ ============ */
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 600);
}, { passive: true });

toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============ ФОРМА ЗАПИСИ ============ */
const form = document.getElementById('signupForm');
const successMsg = document.getElementById('formSuccess');

const validators = {
    name: (v) => {
        if (!v.trim()) return 'Укажите имя ученика';
        if (v.trim().length < 2) return 'Слишком короткое имя';
        return '';
    },
    age: (v) => {
        if (!v.trim()) return 'Укажите возраст';
        const n = Number(v);
        if (isNaN(n) || n < 8 || n > 18) return 'Возраст должен быть от 8 до 18 лет';
        return '';
    },
    contact: (v) => {
        if (!v.trim()) return 'Укажите телефон или Telegram';
        if (v.trim().length < 5) return 'Контакт слишком короткий';
        return '';
    },
};

function validateField(field) {
    const name = field.name;
    if (!validators[name]) return true;

    const group = field.closest('.form__group');
    const errorEl = group.querySelector('.form__error');
    const error = validators[name](field.value);

    if (error) {
        group.classList.add('error');
        errorEl.textContent = error;
        return false;
    } else {
        group.classList.remove('error');
        errorEl.textContent = '';
        return true;
    }
}

form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
        if (field.closest('.form__group').classList.contains('error')) {
            validateField(field);
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input[required]');
    let isValid = true;

    fields.forEach(field => {
        if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
        const firstError = form.querySelector('.form__group.error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Отправляем…';
    submitBtn.disabled = true;

    // Имитация отправки — здесь позже можно подключить Formspree / Google Forms / Telegram Bot API
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Заявка:', data);

    setTimeout(() => {
        form.reset();
        successMsg.classList.add('show');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => successMsg.classList.remove('show'), 6000);
    }, 900);
});
