import styles from "./Table.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  addMarkAllCompanies,
  addMarkAllStaff,
  addStaff,
  deleteCompany,
  deleteStaff
} from "../../redux/slices/companiesSlice";

function Table({ children, type }) {
  const flagCompanies = useSelector((state) => state.companiesSlice.flagCompanies);
  const flagStaff = useSelector((state) => state.companiesSlice.flagStaff);
  const dispatch = useDispatch();

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
          <input type="checkbox" id="horns" onChange={()=>{}} checked={type.includes('staff') ? flagStaff : flagCompanies} name="horns" onClick={() => allLineMark()}/>
        </th>
        <th>
          <label htmlFor="horns">Выделить все</label>
        </th>
        <th>
          <button onClick={addLine}>add</button>
        </th>
        <th>
          <button onClick={deleteLine}>delete</button>
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
