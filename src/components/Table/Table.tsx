import React from 'react'
import styles from "./Table.module.css";
import {useAppSelector, useAppDispatch} from "../../redux/store";
import {
  addCompany,
  addMarkAllCompanies,
  addMarkAllStaff,
  addStaff,
  deleteCompany,
  deleteStaff
} from "../../redux/slices/companiesSlice";

type TTable = {
  type: 'companies' | 'staff';
  children: React.JSX.Element | React.JSX.Element[];
}

const Table: React.FC<TTable> = ({ children, type }) => {
  const dispatch = useAppDispatch();

  const flagCompanies = useAppSelector((state) => state.companiesSlice.flagCompanies);
  const flagStaff = useAppSelector((state) => state.companiesSlice.flagStaff);

  const addLine = () => {
    if(type.includes('companies')) {
      dispatch(addCompany())
    }
    if(type.includes('staff')) {
      dispatch(addStaff())
    }
  }

  const deleteLine = () => {
    if(type.includes('companies')) {
      dispatch(deleteCompany())
    }
    if(type.includes('staff')) {
      dispatch(deleteStaff())
    }
  }

  const allLineMark = () => {
    if(type.includes('companies')) {
      dispatch(addMarkAllCompanies())
    }
    if(type.includes('staff')) {
      dispatch(addMarkAllStaff())
    }
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
      <tr>
        <th>
          <input
            className={styles.inputCheckBox}
            type="checkbox"
            id="horns"
            onChange={()=>{}}
            checked={type.includes('staff')
              ? flagStaff
              : flagCompanies}
            name="horns"
            onClick={() => allLineMark()}/>
        </th>
        <th>
          <label htmlFor="horns">Выделить все</label>
        </th>
        <th>
          <button onClick={addLine}>Добавить</button>
        </th>
        <th>
          <button onClick={deleteLine}>Удалить</button>
        </th>
      </tr>
      </thead>
      <tbody>
      {children}
      </tbody>
    </table>
  )
}

export default Table;
