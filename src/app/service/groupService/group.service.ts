import { Injectable } from '@angular/core';
import { GroupListModel } from '../..//model/group-list/group-list.model';

@Injectable({
  providedIn: 'root',
})

export class GroupService {
  groupList: Array<GroupListModel> = [
    { groupName: 'Energy', value: 'Energy', label: 'Energy' },
    { groupName: 'Finance', value: 'Finance', label: 'Finance' },
    {
      groupName: 'Consumer Services',
      value: 'Consumer Services',
      label: 'Consumer Services',
    },
    {
      groupName: 'Technology',
      value: 'Technology',
      label: 'Technology',
    },
    { groupName: 'Finance', value: 'Finance', label: 'Finance' },
    {
      groupName: 'Public Utilities',
      value: 'Public Utilities',
      label: 'Public Utilities',
    },
    {
      groupName: 'Capital Goods',
      value: 'Capital Goods',
      label: 'Capital Goods',
    },
    { groupName: 'Miscellaneous', value: 'Miscellaneous', label: 'Miscellaneous' },
    {
      groupName: 'Consumer Non/Durables',
      value: 'Consumer Non/Durables',
      label: 'Consumer Non/Durables',
    },
    {
      groupName: 'Health Care',
      value: 'Health Care',
      label: 'Health Care',
    },
    {
      groupName: 'Transportation',
      value: 'Transportation',
      label: 'Transportation',
    },
    {
      groupName: 'Basic Industries',
      value: 'Basic Industries',
      label: 'Basic Industries',
    },
  ];
  constructor() {}

  getProductList() {
    return this.groupList;
  }
}
