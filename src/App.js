import React from 'react';
import { App } from 'antd';

const LibraryPage: React.FC = () => {
  const { message, notification, modal } = App.useApp();
  message.success('Good!');
  notification.info({ message: 'Good' });
  modal.warning({ title: 'Good' });
  // ....
  // other message, notification, modal static function
  return <div>Hello word</div>;
};

const LibraryApp: React.FC = () => (
  <App>
    <LibraryPage />
  </App>
);

export default LibraryApp;