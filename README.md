# Проект: Методический конструктор

## Описание проекта

Данное приложение предназначено для управления и создания шаблонов рабочих программ дисциплин (РПД). Оно включает модули
для авторизации, работы с шаблонами, управления данными, взаимодействия с API и пользовательского интерфейса.
Архитектура проекта построена с использованием подхода Feature-Sliced Design для повышения модульности и читаемости
кода.

---

## Структура проекта

### **app**

- **providers**: Провайдеры глобального состояния и контекста.
- **routers**: Настройка маршрутов и навигации в приложении.
- **styles**: Глобальные стили приложения.
- `index.tsx`: Точка входа в приложение.

### **entities**

- **auth**: Логика и сущности, связанные с авторизацией.
- **template**: Логика и сущности, связанные с управлением шаблонами РПД.

### **features**

- Модули с отдельными функциями, связанными с конкретными действиями:
    - **change-rpd-template**: Изменение шаблона РПД.
    - **create-rpd-template**: Создание нового шаблона РПД.
    - **create-rpd-template-from-1c-exchange**: Создание шаблона РПД из данных 1С.
    - **create-rpd-template-from-year**: Создание шаблона РПД на основе определенного года.
    - **select-template-data**: Выбор данных для шаблона.

### **pages**

- Страницы приложения, объединяющие несколько виджетов и функций:
    - **manager**: Интерфейс для менеджеров.
    - **rpd-template**: Управление шаблонами РПД.
    - **sign-in**: Страница авторизации.
    - **teacher-interface**: Интерфейс для преподавателей.

### **shared**

- Общие модули, используемые в разных частях приложения:
    - **ability**: Управление доступами и правами пользователей.
    - **api**: Логика работы с API.
    - **config**: Конфигурационные файлы приложения.
    - **fonts**: Шрифты.
    - **hooks**: Кастомные React-хуки.
    - **lib**: Вспомогательные библиотеки и утилиты.
    - **ui**: Библиотека компонентов пользовательского интерфейса (кнопки, инпуты и т.д.).

### **widgets**

- Независимые виджеты, представляющие собой композицию UI-компонентов и логики:
    - **header**: Хэдер приложения.
    - **rpd-list**: Список шаблонов РПД.

---

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <URL репозитория>
cd <название папки с проектом>
```

### 2. Установка зависимостей

Убедитесь, что у вас установлен Node.js и npm или yarn. Затем выполните:

```bash
npm install
# или
yarn install
```

### 3. Запуск проекта

```bash
npm start
# или
yarn start
```

Проект будет запущен на [http://localhost:3000](http://localhost:3000).

---

## Основные технологии

- **React**: Фреймворк для построения пользовательских интерфейсов.
- **TypeScript**: Строгая типизация для повышения надежности кода.
- **Feature-Sliced Design**: Архитектурный подход для модульности и масштабируемости.
- **React Router**: Маршрутизация в приложении.
- **Axios/Fetch**: Работа с API.

