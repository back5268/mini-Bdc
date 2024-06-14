import { detailProjectApi } from '@api';
import { Cardz, Imagez, Inputz, TextAreaz } from '@components/core';
import { useGetApi } from '@lib/react-query';
import { Carousel, IconButton } from '@material-tailwind/react';
import { useUserState } from '@store';
import React from 'react';

const Project = () => {
  const { project: _id } = useUserState();
  const { data: project } = useGetApi(detailProjectApi, { _id }, 'project');

  return (
    <Cardz className="p-4">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-7/12 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold uppercase leading-normal mb-2">Thông tin dự án</h2>
            <Inputz label="Tên dự án" className="!w-full" value={project?.name} />
            <Inputz label="Mã dự án" className="!w-full" value={project?.code} />
            <Inputz label="Địa chỉ" className="!w-full" value={project?.address} />
            <Inputz label="Số điện thoại BQL" className="!w-full" value={project?.phone} />
            <Inputz label="Email BQL" className="!w-full" value={project?.email} />
            <Inputz label="Phòng ban quản lý" className="!w-full" value={project?.department?.name} />
            <TextAreaz label="Mô tả" value={project?.description} />
          </div>
        </div>
        <div className="w-full lg:w-5/12">
          <div className="flex flex-col gap-2 p-4">
            <h2 className="font-semibold uppercase leading-normal mb-2">Hình ảnh dự án</h2>
            <Imagez src={project?.avatar} isZoom className="w-full" />
            {project?.images?.length > 0 && (
              <Carousel
                loop={true}
                autoplay={true}
                autoplayDelay={3000}
                className="sm:h-96 h-64"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill('').map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </IconButton>
                )}
              >
                {project?.images?.map((image, index) => (
                  <img key={index} src={image} className="h-full w-full object-cover" />
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </Cardz>
  );
};

export default Project;
