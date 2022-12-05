import { FC, useEffect, useState } from 'react';
import { TStatus } from '../../services/types/data';
import Button from '../button/button';
import statusStyles from './status.module.css';
import DropDownIcon from '../../images/drop-down.svg';
import cn from 'classnames';

interface IStatusProps {
  change: boolean;
  status: TStatus | null;
  statusName: string;
  setStatusName: (name: string) => void;
  statuses: Array<TStatus | null>
}

const Status: FC<IStatusProps> = ({ change, status, statusName, setStatusName, statuses }) => {
  const [statusesVisible, setStatusesVisible] = useState(false);
  const onChangeStatus = () => {
    setStatusesVisible(!statusesVisible);
  };
  const onChangeStatusName = (value: string) => {
    setStatusName(value);
    setStatusesVisible(false);
  }

  const nameStatus = status?.status ? status.status : 'не указан';
  const classBorder = statusesVisible ? statusStyles.border : '';

  useEffect(() => {
    setStatusName(nameStatus)
  }, [change])

  return (
    <>
      {!change ? (
        <p className={cn(statusStyles.text, statusStyles.active)}>
          {nameStatus}
        </p>
      ) : (
        <div className={statusStyles.box} >
          <div className={cn(statusStyles.button_box, classBorder)} onClick={onChangeStatus}>
            <Button className={statusStyles.button}>
              {statusName ? statusName : nameStatus}
            </Button>
            <img src={DropDownIcon} alt='Выпадающий список' className={statusStyles.icon} />
          </div>
          {statusesVisible && (
            <ul className={statusStyles.list}>
              {statuses.map(item => (
                <li key={item!.id} className={statusStyles.item} onClick={_ => onChangeStatusName(item!.status)}>
                  {item!.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  )
}

export default Status;