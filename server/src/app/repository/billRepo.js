import { detailBillMd, detailTemplateMd, listBillMd, listDebitMd } from '@models';
import { formatNumber, ghepGiaTri, replaceFistText } from '@utils';
import { JSDOM } from 'jsdom';

export const renderBillRp = async (_id) => {
  const template = await detailTemplateMd({ type: 3, status: 1 });
  if (!template) return { mess: 'Chưa thiết lập mẫu thông báo phí!' };
  const content = template.content;
  const subject = template.subject;

  const bill = await detailBillMd({ _id });
  if (!bill) return { mess: 'Không tìm thấy bảng kê!' };
  const debits = await listDebitMd({ bill: _id });

  const bills = await listBillMd({ month: { $lt: bill.month }, apartment: bill.apartment });
  let no_ky_truoc = 0;
  bills.forEach((d) => (no_ky_truoc += d.amount - d.paid));

  const services = [
    {
      id: 0,
      name: 'Phí khác/ <i style="color:gray">Other Fee</i>'
    },
    {
      id: 2,
      name: 'Phí quản lý/ <i style="color:gray">Management Fee</i>'
    },
    {
      id: 3,
      name: `Tiền nước/ <i style="color:gray">Water Fee`
    },
    {
      id: 4,
      name: 'Phí ô tô, Xe máy, Xe đạp/ <i style="color:gray">Parking Fee</i>'
    },
    {
      id: 5,
      name: 'Phí điện/ <i style="color:gray">Electric Fee</i>'
    }
  ];

  const templateHtml = new JSDOM(content, { contentType: 'text/html' });
  const table = templateHtml.window.document.querySelector('table');
  const tbodys = table.querySelectorAll('tbody');
  let newtbody1 = tbodys[0].querySelectorAll('tr')[0].outerHTML;
  let newtbody2 = tbodys[1].querySelectorAll('tr')[0].outerHTML;
  let newtbody3 = tbodys[2].querySelectorAll('tr')[0].outerHTML;
  let newtbody4 = tbodys[3].querySelectorAll('tr')[0].outerHTML;
  let newtbody5 = tbodys[4].querySelectorAll('tr')[0].outerHTML;

  let tong_phai_thu = 0;
  debits.forEach((debt, index) => {
    if (Array.isArray(debt.data) && debt.data?.[0]) {
      newtbody1 += replaceFistText(
        ghepGiaTri({
          obj: {
            $stt: `<b>1.${index + 1}</b>`,
            $dich_vu_can_ho: `<b>${debt.serviceName}</b>`,
            $thanh_tien: `<b>${formatNumber(debt.cost)}</b>`,
            $phat_sinh: `<b>${formatNumber(debt.summary)}</b>`
          },
          html: tbodys[0].querySelectorAll('tr')[1].outerHTML,
          format: true
        })
      );
      debt.data.forEach((datum, i) => {
        newtbody1 += ghepGiaTri({
          obj: {
            $stt: `1.${index + 1}.${i + 1}`,
            $dich_vu_can_ho: `${datum.service_name}`,
            $date: `${moment(datum.from_date).format('DD/MM/YYYY')} - ${moment(datum.to_date).format('DD/MM/YYYY')}`,
            $so_luong: `${formatNumber(datum.quantity)}`,
            $don_gia: `${formatNumber(datum.price)}`,
            $thanh_tien: `${formatNumber(datum.thanh_tien)}`,
            $phat_sinh: `${formatNumber(datum.phat_sinh)}`
          },
          html: tbodys[0].querySelectorAll('tr')[1].outerHTML,
          format: true
        });
      });
    }
    if (debt.paid)
      newtbody3 += ghepGiaTri({
        obj: {
          $stt: `<b>3.${index + 1}</b>`,
          $dich_vu_can_ho: `<b>${debt.service_name}</b>`,
          $da_thanh_toan: `<b>${formatNumber(debt.paid)}</b>`
        },
        html: tbodys[2].querySelectorAll('tr')[1].outerHTML,
        format: true
      });
    const phai_thu = debt.summary - debt.paid;
    tong_phai_thu += phai_thu;
    newtbody4 += ghepGiaTri({
      obj: {
        $stt: `<b>4.${index + 1}</b>`,
        $dich_vu_can_ho: `<b>${debt.service_name}</b>`,
        $phai_thu: `<b>${formatNumber(phai_thu)}</b>`
      },
      html: tbodys[3].querySelectorAll('tr')[1].outerHTML,
      format: true
    });
  });

  table.innerHTML = table.querySelector('thead').outerHTML + newtbody1 + newtbody2 + newtbody3 + newtbody4 + newtbody5;
  let html = templateHtml.window.document.querySelector('body').outerHTML;

  const newParams = {
    $don_gia: formatNumber(
      don_gia.data?.[0]?.vat ? (don_gia.data?.[0]?.price * (100 + don_gia.data?.[0]?.vat)) / 100 : don_gia.data?.[0]?.price
    ),
    $vat_dich_vu: don_gia.data?.[0]?.vat || 0,
    $dien_tich: don_gia.data?.[0]?.quantity || 0,
    $ten_toa_nha: building_place.code,
    $tong_phai_thu: formatNumber(tong_phai_thu + no_ky_truoc),
    $chu_ky_truong_ban: chu_ky_truong_ban,
    $ten_truong_ban: ten_truong_ban
  };

  html = ghepGiaTri({ obj: { ...params, ...newParams }, html });
  html = replaceFistText(html);
  return { data: html };
};
