import styles from "./LineTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addMarkCompany, addMarkStaff } from "../../redux/slices/companiesSlice";

function LineTable({ el, onChangeInput, type }) {
  const mark = useSelector((state) => state.companiesSlice.mark);
  const markStaff = useSelector((state) => state.companiesSlice.markStaff);
  const staff = useSelector((state) => state.companiesSlice.staff);
  const dispatch = useDispatch();

  const checkedMarkCompany = mark.some((item) => el.id === item.id);
  const checkedMarkStaff = markStaff.some((item) => el.id === item.id);
  const staffForSum = el.id ? staff.find((item) => item.companyId === el.id) : null;

  const markLineCompany = (e) => {
    dispatch(addMarkCompany(e.target.id));
  }

  const markLineStaff = (e) => {
    dispatch(addMarkStaff(e.target.id))
  }

  return (
    <>
      {type === 'companies' && (
        <tr key={el.id} className={checkedMarkCompany ? styles.line : styles.none}>
          <td className={styles.checkTd}>
            <input className={styles.inputCheckBox} onChange={()=>{}} checked={checkedMarkCompany} type="checkbox" id={el.id} name={el.name} onClick={(e) => markLineCompany(e)}/>
          </td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="name"
              value={el.name}
              type="text"
              onChange={(e) => onChangeInput(e, el.id)}
              placeholder="Type Name"
              disabled={!checkedMarkCompany}
            />
          </td>
          <td className={styles.td}>Персонал {staffForSum.staff.length}</td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="address"
              value={el.address}
              type="text"
              onChange={(e) => onChangeInput(e, el.id)}
              placeholder="Type Address"
              disabled={!checkedMarkCompany}
            />
          </td>
        </tr>
      )}
      {type === 'staff' && (
        <tr key={el.id} className={checkedMarkStaff ? styles.line : styles.none}>
          <td className={styles.checkTd}>
            <input className={styles.inputCheckBox} onChange={()=>{}} checked={checkedMarkStaff} type="checkbox" id={el.id} name={el.name} onClick={(e) => markLineStaff(e)}/>
          </td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="surname"
              value={el.surname}
              type="text"
              onChange={(e) => onChangeInput(e, el.id)}
              placeholder="Type Surname"
              disabled={!checkedMarkStaff}
            />
          </td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="name"
              value={el.name}
              type="text"
              onChange={(e) => onChangeInput(e, el.id)}
              placeholder="Type Name"
              disabled={!checkedMarkStaff}
            />
          </td>
          <td className={styles.td}>
            <input
              className={styles.inputText}
              name="position"
              value={el.position}
              type="text"
              onChange={(e) => onChangeInput(e, el.id)}
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
