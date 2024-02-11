import React from 'react'
import styles from './Companies.module.css';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import Table from "../Table/Table";
import LineTable from "../LineTable/LineTable";
import { editCompany } from "../../redux/slices/companiesSlice";

const Companies: React.FC =() => {
  const dispatch = useAppDispatch();

  const companies = useAppSelector((state) => state.companiesSlice.companies);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = e.target
    dispatch(editCompany({ name, value, id }))
  }

  return (
    <div className={styles.block}>
      <Table type='companies'>
        {companies && companies.map((el) => (
          <LineTable element={el} onChangeInput={onChangeInput} key={el.id} type='companies'/>
        ))}
      </Table>
    </div>
  )
}

export default Companies;
