import { useState } from "react";

type Return = [boolean, () => void];

export const useActive = (initialState: boolean = false): Return => {
  const [active, setActive] = useState<boolean>(initialState);

  const handleToggle = () => setActive(!active);

  return [active, handleToggle];
};
