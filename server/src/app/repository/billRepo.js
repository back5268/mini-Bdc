import { generateVietQrLink } from '@lib/viet-qr';
import { detailApartmentMd, detailBillMd, detailProjectMd, detailTemplateMd, listBillMd, listDebitMd } from '@models';
import { formatNumber, ghepGiaTri, replaceFistText } from '@utils';
import { JSDOM } from 'jsdom';
import moment from 'moment';

export const renderBillRp = async (_id) => {
  const template = await detailTemplateMd({ type: 3, status: 1 });
  if (!template) return { mess: 'Chưa thiết lập mẫu thông báo phí!' };
  const content = template.content;
  const subject = template.subject;

  const bill = await detailBillMd({ _id });
  if (!bill) return { mess: 'Không tìm thấy bảng kê!' };
  const debits = await listDebitMd({ bill: bill._id });

  const project = await detailProjectMd({ _id: bill.project });
  const apartment = await detailApartmentMd({ _id: bill.apartment }, [{ path: 'owner', select: 'fullName email' }]);

  const bills = await listBillMd({ month: { $lt: bill.month }, apartment: bill.apartment });
  let no_ky_truoc = 0,
    tong_phai_thu = 0,
    da_thanh_toan = 0,
    tong_phat_sinh = 0,
    tong_thanh_tien = 0,
    tong_giam_tru = 0;
  bills.forEach((d) => (no_ky_truoc += d.amount - d.paid));

  const services = [
    {
      id: 5,
      name: 'Phí khác/ <i style="color:gray">Other Fee</i>'
    },
    {
      id: 1,
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
      id: 2,
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

  debits.forEach((debt, index) => {
    const name = services.find((s) => s.id === debt.serviceType)?.name;
    tong_thanh_tien += debt.cost;
    tong_phat_sinh += debt.summary;
    tong_giam_tru += debt.discount;
    if (debt.serviceType === 4) {
      newtbody1 += replaceFistText(
        ghepGiaTri({
          obj: {
            $stt: `1.${index + 1}`,
            $dich_vu_can_ho: `${name}`,
            $thanh_tien: `${formatNumber(debt.cost)}`,
            $giam_tru: `${formatNumber(debt.discount)}`,
            $phat_sinh: `${formatNumber(debt.summary)}`
          },
          html: tbodys[0].querySelectorAll('tr')[1].outerHTML,
          format: true
        })
      );
      debt.data?.forEach((datum, i) => {
        newtbody1 += ghepGiaTri({
          obj: {
            $stt: `1.${index + 1}.${i + 1}`,
            $dich_vu_can_ho: `${datum.name}`,
            $date: `${moment(debt.fromDate).format('DD/MM/YYYY')} - ${moment(debt.toDate).format('DD/MM/YYYY')}`,
            $so_luong: `${formatNumber(1)}`,
            $don_gia: `${formatNumber(datum.amount)}`,
            $thanh_tien: `${formatNumber(datum.amount)}`
          },
          html: tbodys[0].querySelectorAll('tr')[1].outerHTML,
          format: true
        });
      });
    } else {
      let don_gia = '';
      const prices = debt.prices;
      if (prices.length === 1 && prices[0].from === 0 && prices[0].to === 0) don_gia = formatNumber(prices[0]?.amount);
      else if (prices.length > 1) {
        prices.forEach((p) => {
          don_gia += `<p style="white-space: nowrap;"><span>Từ: ${p.from}</span>
          <span>Đến: ${p.to}</span>
          <span>Giá: ${formatNumber(p.amount)}</span></p>`;
        });
      } else don_gia = formatNumber(e.price);
      newtbody1 += replaceFistText(
        ghepGiaTri({
          obj: {
            $stt: `1.${index + 1}`,
            $dich_vu_can_ho: `${name}`,
            $date: `${moment(debt.fromDate).format('DD/MM/YYYY')} - ${moment(debt.toDate).format('DD/MM/YYYY')}`,
            $thanh_tien: `${formatNumber(debt.cost)}`,
            $phat_sinh: `${formatNumber(debt.summary)}`,
            $so_luong: `${formatNumber(debt.quantity)}`,
            $don_gia: don_gia,
            $giam_tru: `${formatNumber(debt.discount)}`
          },
          html: tbodys[0].querySelectorAll('tr')[1].outerHTML,
          format: true
        })
      );
    }
    const phai_thu = debt.summary;
    tong_phai_thu += phai_thu;
  });

  table.innerHTML = table.querySelector('thead').outerHTML + newtbody1 + newtbody2 + newtbody3 + newtbody4 + newtbody5;
  let html = templateHtml.window.document.querySelector('body').outerHTML;

  const service = debits.find((d) => d.serviceType === 1);
  const params = {
    $apartmentCode: apartment.name,
    $owner: apartment.owner?.fullName,
    $price: formatNumber(service?.price),
    $area: formatNumber(service?.quantity),
    $ten_du_an: project.name,
    $tong_no_ky_truoc: formatNumber(no_ky_truoc),
    $tong_da_thanh_toan: formatNumber(da_thanh_toan),
    $tong_thanh_tien: formatNumber(tong_thanh_tien),
    $tong_phat_sinh: formatNumber(tong_phat_sinh),
    $tong_giam_tru: formatNumber(tong_giam_tru),
    $logo: project.avatar,
    $qrCode: generateVietQrLink(tong_phai_thu + no_ky_truoc - da_thanh_toan, 'Thanh toan phi can ho ' + apartment.code),
    $month: bill.month,
    $ngay_tao: moment(bill.createdAt).format('DD/MM/YYYY'),
    $tong_phai_thu: formatNumber(tong_phai_thu + no_ky_truoc - da_thanh_toan)
  };

  html = ghepGiaTri({ obj: { ...params }, html });
  html = replaceFistText(html);
  return { data: { content: html, subject, apartment } };
};
