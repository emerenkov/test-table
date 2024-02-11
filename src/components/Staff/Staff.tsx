import React from 'react'
import styles from './Staff.module.css';
import {useAppSelector, useAppDispatch} from "../../redux/store";
import Table from "../Table/Table";
import LineTable from "../LineTable/LineTable";
import { TDataStaff, editStaff } from "../../redux/slices/companiesSlice";

const Staff: React.FC = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.companiesSlice.staff);
  const mark = useAppSelector((state) => state.companiesSlice.mark);

  const companyFromMark: TDataStaff | boolean | undefined = mark.length < 2
    && mark.length !== 0
    && data.find((el) => el.companyId === mark[0].id);


  if (!companyFromMark) {
    return (
      <h2 className={styles.info}>Выберите одну компанию</h2>
    )
  }

  const onChangeInputStaff = (e: React.ChangeEvent<HTMLInputElement>, Id: string) => {
    const { name, value } = e.target
    dispatch(editStaff({ name, value, Id, companyId: companyFromMark.companyId }))
  }

  return (
    <>
      {companyFromMark &&
        <div className={styles.block}>
          <Table type='staff'>
            {companyFromMark && companyFromMark?.staff.map((el) => (
              <LineTable element={el} onChangeInput={onChangeInputStaff} key={el.id} type='staff'/>
            ))}
          </Table>
        </div>
      }
    </>
  )
}

export default Staff;
