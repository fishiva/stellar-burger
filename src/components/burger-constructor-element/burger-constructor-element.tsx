import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { moveIngredients, removeIngridients} from '../../services/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {

    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredients({index, newIndex: 1}));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredients({index, newIndex: -1}));
    };

    const handleClose = () => {
      dispatch(removeIngridients(ingredient.id))
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
