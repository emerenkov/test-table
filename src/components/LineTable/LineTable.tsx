import React from 'react';
import styles from "./LineTable.module.css";
import {addMarkCompany, addMarkStaff, TDataCompanies, TStaff} from "../../redux/slices/companiesSlice";
import {useAppDispatch, useAppSelector} from "../../redux/store";

type TLineTable  = {
  element: Partial<TDataCompanies & TStaff>;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  type: 'companies' | 'staff';
}

const LineTable: React.FC<TLineTable> = ({ element, onChangeInput, type }) => {
  const dispatch = useAppDispatch();

  const mark = useAppSelector((state) => state.companiesSlice.mark);
  const markStaff = useAppSelector((state) => state.companiesSlice.markStaff);
  const staff = useAppSelector((state) => state.companiesSlice.staff);

  const checkedMarkCompany = mark.some((item) => element.id === item.id);
  const checkedMarkStaff = markStaff.some((item) => element.id === item.id);
  const staffForSum = element.id ? staff.find((item) => item.companyId === element.id) : null;

  const markLineCompany = (el: string) => {
    dispatch(addMarkCompany(el));
  }

  const markLineStaff = (el: string) => {
    dispatch(addMarkStaff(el))
  }

  return (
    <>
      {type === 'companies' && (
        <tr key={element.id} className={checkedMarkCompany ? styles.line : styles.none}>
          <td className={styles.checkTd}>
            <input
              className={styles.inputCheckBox}
              onChange={()=>{}}
              checked={checkedMarkCompany}
              type="checkbox"
              id={element.id}
              name={element.name}
              onClick={(e) => markLineCompany(element.id!)}/>
          </td>
          <td className={`${styles.tdName} ${styles.td}`}>
            <input
              className={styles.inputText}
              name="name"
              value={element.name}
              type="text"
              onChange={(e) => onChangeInput(e, element.id!)}
              placeholder="Type Name"
              disabled={!checkedMarkCompany}
            />
          </td>
          <td className={styles.td}>Персонал {staffForSum?.staff.length}</td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="address"
              value={element.address}
              type="text"
              onChange={(e) => onChangeInput(e, element.id!)}
              placeholder="Type Address"
              disabled={!checkedMarkCompany}
            />
          </td>
        </tr>
      )}
      {type === 'staff' && (
        <tr key={element.id} className={checkedMarkStaff ? styles.line : styles.none}>
          <td className={styles.checkTd}>
            <input className={styles.inputCheckBox} onChange={()=>{}} checked={checkedMarkStaff} type="checkbox" id={element.id} name={element.name} onClick={(e) => markLineStaff(element.id!)}/>
          </td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="surname"
              value={element.surname}
              type="text"
              onChange={(e) => onChangeInput(e, element.id!)}
              placeholder="Type Surname"
              disabled={!checkedMarkStaff}
            />
          </td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="name"
              value={element.name}
              type="text"
              onChange={(e) => onChangeInput(e, element.id!)}
              placeholder="Type Name"
              disabled={!checkedMarkStaff}
            />
          </td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="position"
              value={element.position}
              type="text"
              onChange={(e) => onChangeInput(e, element.id!)}
              placeholder="Type Position"
              disabled={!checkedMarkStaff}
            />
          </td>
        </tr>
      )}
    </>
  )
}

export default LineTable;
