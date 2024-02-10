import { useState } from "react";
import styles from './Staff.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Table from "../Table/Table";
import LineTable from "../LineTable/LineTable";
import { editStaff } from "../../redux/slices/companiesSlice";

function Staff() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.companiesSlice.staff);
  const mark = useSelector((state) => state.companiesSlice.mark);
  // const oneCompanyStaff = useSelector((state) => state.companiesSlice.companyStaff);

  const companyFromMark = mark.length < 2 && mark.length !== 0 && data.find((el) => el.companyId === mark[0].id);

  const [staffData, setStaffData] = useState('dataStaff');

  const onChangeInputStaff = (e, Id) => {
    const { name, value } = e.target
    dispatch(editStaff({ name, value, Id, companyId: companyFromMark.companyId }))
  }

  if (!companyFromMark.staff) {
    return (
      <h2>Выберите одну компанию</h2>
    )
  }

  return (
    <>
      {companyFromMark &&
        <div className={styles.block}>
          <Table type='staff'>
            {companyFromMark && companyFromMark.staff.map((el) => (
              <LineTable el={el} onChangeInput={onChangeInputStaff} key={el.id} type='staff'/>
            ))}
          </Table>
        </div>
      }
    </>

  )
}

export default Staff;
