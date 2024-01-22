
import React from 'react';
import variable from './ExportDefault'

import * as ExportAllModule from './Export*';


const ImportExportGrammer = () => {
  return <>
    <div>export default from ExportDefault{variable}</div>
    <div> export * default part {ExportAllModule.default}</div>
    <div>export * variable part {ExportAllModule.variable}</div>

  </>


}

export default ImportExportGrammer;