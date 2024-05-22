import { ModelBase } from '@config';

class ToolMd extends ModelBase {
  by;
  updateBy;
  type;
  code;
  subject;
  content;
  description;
  status;
  deletedAt;
}

ToolMd.init('Tool', {
  name: { type: String, required: true },
  sort: { type: Number, required: true },
  icon: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  children: [
    {
      name: { type: String, require: true },
      route: { type: String, require: true },
      sort: { type: Number, require: true },
      actions: [{ type: String, require: true }]
    }
  ],
  deletedAt: { type: Date }
});

export const listToolMd = (where, page, limit, populates, attr, sort) => {
  return ToolMd.find({ where, page, limit, populates, attr, sort });
};

export const countToolMd = (where) => {
  return ToolMd.count({ where });
};

export const detailToolMd = (where, populates, attr) => {
  return ToolMd.findOne({ where, populates, attr });
};

export const createToolMd = (attr) => {
  return ToolMd.create({ attr });
};

export const updateToolMd = (where, attr) => {
  return ToolMd.update({ where, attr });
};

export const updateManyToolMd = (where, attr) => {
  return ToolMd.update({ where, attr });
};

export const deleteToolMd = (where) => {
  return ToolMd.delete({ where });
};
