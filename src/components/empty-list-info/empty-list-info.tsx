import React from "react";

import EmptyListInfoProps from "./empty-list-info";

const EmptyListInfo = ({ onAddClick }: EmptyListInfoProps) => (
  <>
    <button className="btn btn-primary w-100 mb-3" onClick={onAddClick}>
      Dodaj zadanie
    </button>
    <p className="text-center">Brak zadań</p>
  </>
);

export default EmptyListInfo;
