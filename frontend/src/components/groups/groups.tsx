import { FC } from 'react';
import { TDataGroups } from "../../services/types/data";
import Button from '../button/button';
import Text from '../text/text';
import groupsStyles from './groups.module.css';

interface IGroupsProps {
  groups: Array<TDataGroups>
};

const Groups: FC<IGroupsProps> = ({ groups }) => {

  return (
    <ul className={groupsStyles.list}>
      {groups.map(item => (
        <li key={item.id}>
          <Button clickHandler={()=>{}} className={groupsStyles.button}>
            <Text class={groupsStyles.text} text={item.title} />
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Groups;