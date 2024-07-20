export const templates = [
  {
    type: 1,
    code: 'FORGOT_PASSWORD',
    subject: '[Mini BDC] - Quên mật khẩu!',
    content: `<p>Bạn hoặc ai đó đã sử dụng email lấy lại mật khẩu tài khoản: <b>$username</b>!</p>
            <p>Mã xác nhận của bạn là: <b>$otp</b> </p> <br />
            <p>Lưu ý: Mã xác nhận chỉ được sử dụng 1 lần và có <b>thời hạn trong 30 phút.</b></p>
            <p>Vui lòng không cung cấp mã xác nhận trên cho bất kỳ ai.</p>
            <p>Trân trọng cảm ơn,</p> <br />
            <p>------------------------------------------------------------</p>
            <p>Thanks and best regards,</p>
            <p><i>Development</i></p>
            `
  },
  {
    type: 2,
    code: 'SEND_NEWS',
    subject: '[Mini BDC] - Thông báo: $subject',
    content: `<p>Kính gửi Quý cư dân $ten_cu_dan,</p>
            <p>Nội dung: $noi_dung</p>
            <p>PHẦN MỀM TIỆN ÍCH CHUNG CƯ MINI BDC</p>
            <p>Trân trọng thông báo!</p>
            `
  },
  {
    type: 3,
    code: 'SEND_BILL',
    subject: '[Mini BDC] - Gửi thông báo phí',
    content: `<main style="max-width: 1200px; margin: 0 auto;">
    <div style="display: flex; align-items: center;">
        <img src="https://mini-bdc.vercel.app/images/logo.png" height="100px" width="100px" />
        <div style="width: 100%; text-align: center;">
            <h3 style="text-align: center; margin: 8px; font-weight: 700;">TH&Ocirc;NG B&Aacute;O PH&Iacute; - KỲ
                $month
            </h3>
            <h3 style="text-align: center; margin: 8px; font-weight: 300; color: gray;"><em>MONTHLY FEE NOTICE - PERIOD
                    $month</em></h3>
            <p style="margin-left: 20%;">Ng&agrave;y ph&aacute;t h&agrave;nh/ <em style="color: gray;"> Issue date:</em>
                $ngay_tao</p>
        </div>
        <img src="$logo" height="100px" width="100px"/>
    </div>

    <div style="margin-top: 24px;"></div>
    <div style="float: left;">
        <p style="margin: 4px; line-height: 22px;">M&atilde; căn hộ/ <em style="color: gray;"> Unit code:</em>
            <strong>$apartmentCode</strong>
        </p>
        <p style="margin: 4px; line-height: 22px;">Họ t&ecirc;n chủ hộ/ <em style="color: gray;"> Owner name:</em>
            <strong>$owner</strong>
        </p>
    </div>
    <div style="margin-right: 2%; float: right; margin-bottom: 24px;">
        <p style="margin: 4px; line-height: 22px;">Diện t&iacute;ch/ <em style="color: gray;"> Area:</em>
            <strong>$area</strong> m2
        </p>
        <p style="margin: 4px; line-height: 22px;">Đơn gi&aacute;/ <em style="color: gray;"> Unit Price:</em>
            <strong>$price</strong> đồng (VNĐ/m2)
        </p>
    </div>
    <table style="border-collapse: collapse; width: 100%; margin: 8px 0; margin-top: 24px;">
        <thead>
            <tr>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: center; width: 4.58015%;">
                    <strong>STT</strong> <em style="font-weight: 600; color: gray;">No.</em>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: center; width: 11.4504%;"><strong>Diễn
                        giải/</strong> <em style="font-weight: 600; color: gray;">Description</em></td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: center; width: 11.5444%;"><strong>Từ
                        ng&agrave;y/</strong> <em style="font-weight: 600; color: gray;">From</em> <br><strong>Đến
                        ng&agrave;y/</strong> <em style="font-weight: 600; color: gray;">To</em></td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: center; width: 6.29907%;"><strong>Số
                        lượng/</strong> <em style="font-weight: 600; color: gray;">Quantity</em></td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: center; width: 9.73282%;"><strong>Đơn
                        gi&aacute;/</strong> <em style="font-weight: 600; color: gray;">Unit price</em></td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: center; width: 14.0267%;">
                    <strong>Th&agrave;nh tiền/</strong> <em style="font-weight: 600; color: gray;">Amount</em>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: center; width: 15.5534%;"><strong>Giảm
                        trừ/</strong> <em style="font-weight: 600; color: gray;">Reduce</em></td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: center; width: 16.2214%;"><strong>Tổng
                        cộng/</strong> <em style="font-weight: 600; color: gray;">Total</em></td>
            </tr>
        </thead>
        <tbody>
            <tr style="background-color: #f1f1f1; border: 1px solid black;">
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 4.58015%;">
                    <strong>1</strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 39.0267%;" colspan="4">
                    <strong>PH&Iacute; TRONG TH&Aacute;NG/ <em style="color: gray;"> MONTH FEES</em> </strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 14.0267%;">
                    <strong>$tong_thanh_tien</strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 10.687%;">
                    <strong>$tong_giam_tru</strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;">
                    <strong>$tong_phat_sinh</strong>
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 4.58015%;">$stt</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 11.4504%;">
                    $dich_vu_can_ho</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 11.5444%;">$date</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 6.29907%;">$so_luong
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 9.73282%;">$don_gia</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 14.0267%;">$thanh_tien
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 10.687%;">$giam_tru</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;">$phat_sinh
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr style="background-color: #f1f1f1; border: 1px solid black;">
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 4.58015%;">
                    <strong>2</strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 79.2939%;" colspan="6">
                    <strong>NỢ TỒN/ <em style="color: gray;"> OUTSTANDING</em> </strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;">
                    <strong>$tong_no_ky_truoc</strong>
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 4.58015%;">$stt</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 79.2939%;" colspan="6">
                    $dich_vu_can_ho</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;">$no_ky_truoc
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr style="background-color: #f1f1f1; border: 1px solid black;">
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 4.58015%;">
                    <strong>3</strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 79.2939%;" colspan="6">
                    <strong>Đ&Atilde; THANH TO&Aacute;N/ <em style="color: gray;"> PAID</em> </strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;">
                    <strong>$tong_da_thanh_toan</strong>
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 4.58015%;">$stt</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 79.2939%;" colspan="6">
                    $dich_vu_can_ho</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;">
                    $da_thanh_toan</td>
            </tr>
        </tbody>
        <tbody>
            <tr style="background-color: #f1f1f1; border: 1px solid black;">
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 4.58015%;">
                    <strong>4</strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 79.2939%;" colspan="6">
                    <strong>TỔNG HỢP/ <em style="color: gray;"> SUMMARY</em> </strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;">
                    <strong>$tong_phai_thu</strong>
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 4.58015%;">$stt</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 79.2939%;" colspan="6">
                    $dich_vu_can_ho</td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;">$phai_thu
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: left; width: 83.874%;" colspan="7">
                    <strong>TỔNG SỐ TIỀN PHẢI THANH TO&Aacute;N/ <em style="color: gray;"> TOTAL AMOUNT</em> </strong>
                </td>
                <td style="border: 1px solid black; padding: 8px 4px; text-align: right; width: 16.2214%;"><span
                        style="font-size: 14pt;"><strong>$tong_phai_thu</strong></span></td>
            </tr>
        </tbody>
    </table>
    <p>&nbsp;</p>
    <p style="margin: 4px; line-height: 22px;"><strong>- Qu&yacute; cư d&acirc;n vui l&ograve;ng thanh to&aacute;n trong
            v&ograve;ng bảy (07) ng&agrave;y kể từ ng&agrave;y ph&aacute;t h&agrave;nh th&ocirc;ng b&aacute;o ph&iacute;
            n&agrave;y/</strong> <em style="color: gray;">This bill has to be paid within seven (07) working days from
            the date of issuance</em></p>
    <p style="margin: 4px; line-height: 22px;"><strong>- Nếu sau bảy (07) ng&agrave;y kể từ ng&agrave;y ph&aacute;t
            h&agrave;nh th&ocirc;ng b&aacute;o ph&iacute; n&agrave;y, Qu&yacute; cư d&acirc;n vẫn chưa thanh
            to&aacute;n, BQL sẽ gửi th&ocirc;ng b&aacute;o nhắc lần một (1)/</strong> <em style="color: gray;">If after
            seven (07) days from the date of issuance of this fee notice, the residents still have not paid, the
            Management office will send the first reminder notice.</em></p>
    <p style="margin: 4px; line-height: 22px;"><strong>- BQL sẽ kh&ocirc;ng chịu tr&aacute;ch nhiệm nếu c&oacute; xảy ra
            sai s&oacute;t do Qu&yacute; cư d&acirc;n KH&Ocirc;NG GHI M&Atilde; CĂN KHI CHUYỂN KHOẢN/</strong> <em
            style="color: gray;">The Management office will not be responsible if there is an error because the resident
            DO NOT ENTER THE APARTMENT NUMBER WHEN TRANSFERRING</em></p>
    <div style="display: flex;">
        <div style="margin-left: 5%; margin-top: 16px; margin-right: 16px; float: left;">
            <p style="margin: 4px; line-height: 22px;">Th&ocirc;ng tin chuyển khoản/ <em style="color: gray;">Bank
                    tranfer's
                    information</em></p>
            <div style="margin-left: 64px;">
                <p style="margin: 4px; line-height: 22px;">Đơn vị thụ hưởng/ <em style="color: gray;">Account Name:
                    </em>
                    <strong>Tạ Văn Bách</strong>
                </p>
                <p style="margin: 4px; line-height: 22px;">T&agrave;i khoản số/ <em style="color: gray;">Account Number:
                    </em> <strong>606606868 </strong> <span style="margin-left: 16px;">Tại/<em style="color: gray;">
                            At:
                        </em><strong>MB Bank</strong></span></p>
                <p style="margin: 4px; line-height: 22px;">Nội dung chuyển khoản: <em
                        style="color: gray; font-weight: 600;">( Căn hộ&hellip;&hellip;..Nộp tiền
                        Ph&iacute;&hellip;&hellip;.. Th&aacute;ng &hellip;..). </em></p>
                <p style="margin: 4px; line-height: 22px;"><em style="color: gray;">Bank transfer description: <strong>(
                            Căn
                            hộ&hellip;&hellip;..Nộp tiền Ph&iacute;&hellip;&hellip;.. Th&aacute;ng
                            &hellip;..).</strong>&nbsp;</em></p>
                <p style="margin: 4px; line-height: 22px;">&nbsp;</p>
            </div>
            <p style="margin: 4px; line-height: 22px;">Qu&yacute; cư d&acirc;n vui l&ograve;ng bỏ qua th&ocirc;ng
                b&aacute;o
                n&agrave;y nếu đ&atilde; thực hiện thanh to&aacute;n/ <em style="color: gray;"> Residents kindly ignore
                    this fee
                    notice if this amount was be paid. </em></p>
        </div>
        <div style="float: right; margin-right: 128px; margin-top: 32px;">
            <div style="height: 200px;"><img src="$qrCode" height="200px" style="height: 200px" /></div>
        </div>
    </div>
    <div style="margin-top: 64px; float: right;">
        <div style="text-align: center;">
            <h4 style="margin: 4px; text-transform: uppercase;">VĂN PH&Ograve;NG QUẢN L&Yacute; $ten_du_an</h4>
            <p style="margin: 4px; text-transform: uppercase;"><em style="color: gray;">MANAGEMENT OFFICE
                    $ten_du_an</em></p>
            <h4 style="margin: 4px;">$ten_truong_ban</h4>
            <p style="margin: 4px;"><strong>Trưởng ban QLTN/</strong> <em
                    style="color: gray; font-weight: 600;">Property Manager</em></p>
        </div>
    </div>
</main>
            `
  }
];
