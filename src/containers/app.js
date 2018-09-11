import React from 'react';

import {importFile} from './../common';
import {Edit, Menu, Table} from './../components';
import {EditIcon, ExportIcon, ImportIcon, TableIcon} from './../icons';

import './../scss/index.scss';

const App = () => (
  <Menu
    items={[
      {
        title: {
          label: 'Таблица',
          icon: <TableIcon/>
        },
        component: <Table/>
      },
      {
        title: {
          label: 'Ввод',
          icon: <EditIcon/>
        },
        component: <Edit/>
      },
      {
        title: {
          label: 'Импорт',
          icon: <ImportIcon/>
        },
        onClick: () => importFile()
      },
      {
        title: {
          label: 'Экспорт',
          icon: <ExportIcon/>
        },
        onClick: () => window.open('/api/export/')
      }
    ]}
  />
);

export default App;
