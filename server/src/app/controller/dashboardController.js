import { countApartmentMd } from "@models";

export const getDashboard = async (req, res) => {
    try {
        const totalApartment = await countApartmentMd({ project: req.project?._id });
        const totalResident = await countUserMd({ project: req.project?._id, type: 'resident' });
        const totalVehicle = await countVehicleMd({ project: req.project?._id });
        const items = [
            { image: '/images/logo.png', amount: 10, label: 'Dự án' },
            { image: '/images/logo.png', amount: totalApartment, label: 'Căn hộ' },
            { image: '/images/logo.png', amount: totalResident, label: 'Cư dân' },
            { image: '/images/logo.png', amount: totalVehicle, label: 'Phương tiện' }
        ];
        res.json({ status: true, data: items });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
}

