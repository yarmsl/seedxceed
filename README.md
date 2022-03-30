# Приложение создано с помощью [Create React App](https://github.com/facebook/create-react-app) на TypeScript

## Доступные скрипты

В Корневой директории вы можете запустить

### `npm start` (Linux)

### `npm start-w` (Windows)

Запускает русскую локализацию приложения
Откройте [https://dev.seed-x-ceed.com:3000/](https://dev.seed-x-ceed.com:3000/) для просмотра в браузере.

### `npm start-br` (Linux)

### `npm start-br-w` (Windows)

Запускает бразильскую локализацию приложения
Откройте [https://dev.seed-x-ceed.com:3001/](https://dev.seed-x-ceed.com:3001/) для просмотра в браузере.

Страница перезагрузится, если вы внесете изменения.\
Вы также увидите любые ошибки lint в консоли.

### `npm run lint`

Запускает проверку линтера, при наличии ошибок пайплайн не пройдёт

### `npm run analyze`

Визуализация размеров (веса) используемых в Приложении пакетов

### `npm run build`

Строит продакшн версию русской локализации в папке `build`.

### `npm run build-dev`

Строит тестовую версию русской локализации в папке `build`.

### `npm run build-br`

Строит продакшн версию бразильской локализации в папке `build_br`.

### `npm run build-dev-br`

Строит тестовую версию бразильской локализации в папке `build_br`.

## Пакеты, используемые в приложении

### [MUI](https://mui.com/getting-started/usage/)

Компонентная библиотека для стилизации (работаем через sx prop)

### [Redux-toolkit](https://redux-toolkit.js.org/)

Управление состоянием Приложения.\
Работа со всеми api осуществляется только (!) через [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk) или [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

### [React Hook Form](https://react-hook-form.com/)

Библиотека для работы с формами.

### [i18n](https://react.i18next.com/)

Библиотека для интернационализации. Все тексты в приложении заносятся в соответсвующие json в папке `public/locales`.\
Поддерживаемые языки: `ru`, `pt-BR`, `en`

### [Recharts](https://recharts.org/en-US/)

Библиотека для работы с графиками.
