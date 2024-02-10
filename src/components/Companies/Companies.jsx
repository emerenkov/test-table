import styles from './Companies.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Table from "../Table/Table";
import LineTable from "../LineTable/LineTable";
import { editCompany } from "../../redux/slices/companiesSlice";

function Companies() {
  const companies = useSelector((state) => state.companiesSlice.companies);
  const dispatch = useDispatch();

  const onChangeInput = (e, compId) => {
    const { name, value } = e.target
    dispatch(editCompany({ name, value, compId }))
  }

  return (
    <div className={styles.block}>
      <Table type='companies'>
        {companies && companies.map((el) => (
          <LineTable el={el} onChangeInput={onChangeInput} key={el.id} type='companies'/>
        ))}
      </Table>
    </div>
  )
}

export default Companies;
