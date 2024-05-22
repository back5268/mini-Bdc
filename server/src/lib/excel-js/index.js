const ExcelJS = require('exceljs');
export const handleFileExcel = async (file, attributes = []) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const sheet = workbook.getWorksheet(1);
    const rowsData = [];

    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        const object = {};
        attributes.forEach((a, index) => {
          object[a] = row.values[index + 1];
        });
        rowsData.push(object);
      }
    });
    return rowsData;
  } catch (error) {
    console.error('Error handling Excel file:', error);
    return [];
  }
};

export const convertToExcel = (data, options = {}) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  const rowWidths = options.widthCol ? {} : fitToColumnV2(data, options.fromRow);

  data.forEach((row, rowIndex) => {
    const excelRow = worksheet.getRow(rowIndex + 1);
    excelRow.values = row;
    if (rowIndex >= (options.fromRow || 0)) {
      excelRow.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    }
  });

  let col = 'A';
  for (let i = 0; i < 10; i++) {
    worksheet.getColumn(col).width = options.widthCol || rowWidths[i];
    col = String.fromCharCode(col.charCodeAt(0) + 1);
  }

  if (options.mergeCells && options.mergeCells[0]) {
    options.mergeCells.forEach((m) => worksheet.mergeCells(m));
  }
  if (options.alignments && options.alignments[0]) {
    options.alignments.forEach((a) => {
      if (typeof a === 'object') {
        for (let key in a) {
          worksheet.getCell(key).alignment = a[key];
        }
      }
    });
  }
  if (options.colors && options.colors[0]) {
    options.colors.forEach((c) => {
      if (typeof c === 'object') {
        for (const key in c) {
          if (Array.isArray(c[key])) {
            c[key].forEach((ck) => {
              const cell = worksheet.getCell(ck);
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: key }
              };
            });
          }
        }
      }
    });
  }
  if (options.fonts && options.fonts[0]) {
    options.fonts.forEach((a) => {
      if (typeof a === 'object') {
        for (let key in a) {
          worksheet.getCell(key).font = a[key];
        }
      }
    });
  }
  if (options.outlineLevels && options.outlineLevels[0]) {
    options.outlineLevels.forEach((o) => {
      worksheet.getRow(o).outlineLevel = 1;
    });
  }

  return workbook.xlsx.writeBuffer();
};

export const fitToColumnV2 = (arrayOfArray, fromRow) => {
  const result = [];
  Object.keys(arrayOfArray[fromRow]).map((value) => {
    const item = [String(value).length * 1.25];
    arrayOfArray.forEach((a, index) => {
      if (index >= fromRow && a[value]) item.push(String(a[value]).length * 1.25);
    });
    result.push(Math.max(...item));
  });
  return result;
};
