import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { dataCompanies } from '../../data/dataCompanies';
import { dataStaff } from "../../data/dataStaff";
import { v4 as uuidv4 } from 'uuid';

export type TStaff = {
  name: string;
  surname: string;
  position: string;
  id: string;
}

export type TDataCompanies = {
  name: string;
  address: string;
  id: string;
}

type TId = {
  id: string;
}

export type TDataStaff = {
  companyId: string;
  staff: TStaff[];
}

interface IInitialState {
  companies: TDataCompanies[];
  mark: TId[];
  markStaff: TId[];
  staff: TDataStaff[];
  flagCompanies: boolean;
  flagStaff: boolean;
}

const initialState: IInitialState = {
  companies: dataCompanies,
  mark: [],
  markStaff: [],
  staff: dataStaff,
  flagCompanies: false,
  flagStaff: false,
}

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    editCompany(state, action) {
      const {name, value,id} = action.payload;
      state.companies = state.companies.map((item) =>
        item.id === id && name ? { ...item, [name]: value } : item
      );
    },
    editStaff(state, action) {
      const {name, value, Id, companyId} = action.payload;
      state.staff = state.staff
        .map((element) => element.companyId === companyId ? {...element, staff: element.staff
            .map((item) => item.id === Id && name ? { ...item, [name]: value}: item)} : element)
    },

    deleteCompany(state) {
      state.mark = state.mark.filter((el) => {
        state.companies = state.companies.filter((item) => item.id !== el.id);
        state.staff = state.staff.filter((item) => item.companyId !== el.id);
      })
      state.flagCompanies = false;
    },

    deleteStaff(state) {
        state.markStaff = state.markStaff.filter((el) => {
            state.staff = state.staff.map((element) => element.companyId === state.mark[0].id ?
              {...element, staff: element.staff = element.staff.filter((item) => item.id !== el.id)}
              : element)
        })
      state.flagStaff = false
    },

    addMarkAllCompanies(state) {
      state.flagCompanies = !state.flagCompanies;
      state.companies.map((item) => {
        const findItemCompany = state.mark.find((obj) => obj.id === item.id)
        if (!findItemCompany && state.flagCompanies) {
          state.mark.push({ id: item.id })
        } else if (!state.flagCompanies) {
          state.mark = [];
        }
      })
    },

    addMarkAllStaff(state) {
      state.flagStaff = !state.flagStaff;
      state.staff.map((el) => {
        if (el.companyId === state.mark[0].id) {
          el.staff.map((obj) => {
            const findItemCompany = state.markStaff.find((item) => obj.id === item.id)
            if (!findItemCompany && state.flagStaff) {
              state.markStaff.push({ id: obj.id })
            } else {
              state.markStaff = [];
            }
          })
        }
      })
    },

    addMarkCompany(state, action: PayloadAction<string>) {
      const findItemCompany = state.mark.find((obj) => obj.id === action.payload)
      if (!findItemCompany) {
        state.mark.push({ id: action.payload })
      } else {
        state.mark = state.mark.filter((el) => el.id !== action.payload);
      }
    },

    addMarkStaff(state, action) {
      const findItemMarkStaff = state.markStaff.find((obj) => obj.id === action.payload)
      if (!findItemMarkStaff) {
        state.markStaff.push({ id: action.payload })
      } else {
        state.markStaff = state.markStaff.filter((el) => el.id !== action.payload);
      }
    },

    addCompany(state) {
      const uId = uuidv4();
      state.companies.push({
        name: 'название компании',
        address: 'адресс',
        id: uId,
      })
      state.staff.push({
        companyId: uId,
        staff: []
      })
    },

    addStaff(state) {
      const uId = uuidv4();
      const findItem = state.staff.find((element) => element.companyId === state.mark[0].id)
      if (findItem) {
        findItem.staff.push({
                name: 'name',
                surname: 'surname',
                position: 'position',
                id: uId,
              })
      }
    },
  },
})

export const {
  editCompany,
  editStaff,
  addMarkCompany,
  addMarkStaff,
  addMarkAllCompanies,
  addMarkAllStaff,
  deleteCompany,
  deleteStaff,
  addCompany,
  addStaff
} = companiesSlice.actions

export default companiesSlice.reducer
