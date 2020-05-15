import {Component} from '@angular/core';

export interface HypotesisRanking {
  'Легкость реализации': number;
  'Доходность': number;
  'Как много клиентов':number;
  'Уровень боли у клиента':number;
  'Нравится это делать':number;
  'Легкость конкуренции':number;
}

export interface Hypotesis {
  name: string,
  ranks: HypotesisRanking;
}
export type Categorie = keyof HypotesisRanking;

const ELEMENT_DATA: Hypotesis[] = [
  {name: "BlazePod (розница)", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "Senaptec (розница)", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "Медиа сервер для соревнований", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "Видеоповторы для тренировок ('HDSHIFT 2.0')", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "Партнерство с Ярославлем по системе видеоповторов", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "Поставки под заказ для клубов", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "Каталог для спортшкол и федераций", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "GPS для 'среднего' уровня", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "Табло для видов спорта на основе судейской системы", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
  {name: "Другие виды спорта в судейской системе", 
  ranks: {'Легкость реализации': 1600, 'Доходность': 1600, 'Как много клиентов': 1600, 'Уровень боли у клиента': 1600, 'Нравится это делать': 1600, 'Легкость конкуренции': 1600}
  },
];

const DISPLAYED_COLUMNS: string[] = ['Легкость реализации', 'Доходность', 'Как много клиентов', 'Уровень боли у клиента','Нравится это делать','Легкость конкуренции']
let display = localStorage.getItem("data");
let dataJson:string = "";

if (display == null) {
  dataJson = JSON.stringify(ELEMENT_DATA);
} else {
  dataJson = display;
}

/**
 * @title Table dynamically changing the columns displayed
 */
@Component({
  selector: 'table-dynamic-columns-example',
  styleUrls: ['table-dynamic-columns-example.css'],
  templateUrl: 'table-dynamic-columns-example.html',
})
export class TableDynamicColumnsExample {
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  columnsToDisplay: string[] = ['name'].concat(this.displayedColumns.slice());
  data: Hypotesis[] = JSON.parse(dataJson);
  sortedData: Hypotesis[] = this.data;
  idx1: number = 0;
  idx2: number = 1;
  cat: Categorie = 'Легкость реализации';

  updateRank(p1: number, p2: number, result: number, category: Categorie) {
    let rank1 = this.data[p1].ranks[category];
    let rank2 = this.data[p2].ranks[category];
    console.log("Comparing", this.data[p1], "to", this.data[p2], "on ",category,"result",result);
    
    console.log("before:",rank1,rank2);
    let pr1: number = (1.0 / (1.0 + Math.pow(10, ((rank2-rank1) / 400))))
    let pr2: number = (1.0 / (1.0 + Math.pow(10, ((rank1-rank2) / 400))))
    console.log("probablity:",pr1,pr2);
    let rank1n = rank1 + 30 * (result - pr1);
    let rank2n = rank2 + 30 * (1-result - pr2);
    console.log("updated ranks:",rank1n,rank2n);
    this.data[p1].ranks[category] = Math.round(rank1n*10)/10;
    this.data[p2].ranks[category] = Math.round(rank2n*10)/10;

    this.idx1 = Math.floor(Math.random() * this.data.length);
    this.idx2 = (this.idx1 + 1 + Math.floor(Math.random() * (this.data.length - 2))) % this.data.length;
    console.log("Next",this.idx1, this.idx2);
    this.updateSort(category);
    
    localStorage.setItem("data", JSON.stringify(this.data));
  } 

  updateSort(cat: Categorie) {
    console.log("Re-sorting data");
    this.sortedData = [...this.data]
    this.sortedData.sort((a:Hypotesis, b:Hypotesis) => (b.ranks[cat] - a.ranks[cat]));
  }
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */