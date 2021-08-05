import React from 'react';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Input from '../../components/Input/Input';

const Test = () => {
    return (
      <table>
        <th>
          <Button
            value="xyz"
          >
            Test
          </Button>
        </th>
        <th>
          <Checkbox
            text="Suhlasim s predanim mojej duse diablovi"
          />
        </th>
        <th>
          <Input
            placeholder="Vase cislo karty"
          />
        </th>
      </table>
    );
};

export default React.memo(Test);
