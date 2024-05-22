import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Hrz } from '.';

class TinyMceEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.setData(e.target.getContent());
  }

  render() {
    return (
      <div className={`card m-2 w-full ${this.props.mess ? 'border-red-600' : ''}`}>
        {this.props.label && (
          <div className="flex justify-between items-center">
            <label className="flex items-center py-2 font-medium">{this.props.label}</label>
            {this.props.mess && <small className="text-red-600">{this.props.mess}</small>}
          </div>
        )}
        <Hrz className={this.props.mess ? 'border-red-600' : ''} />
        <div className="mt-2"></div>
        <Editor
          apiKey="tt83g1s8ehmyleppcijwastmp8oriknphvwpd1n1066pjvd0"
          initialValue={this.props.data}
          init={{
            branding: false,
            height: this.props.height || 400,
            menubar: true,
            plugins:
              'print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern',
            toolbar:
              'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat',
            image_advtab: true,
            content_style: 'tr { text-align: center; }'
          }}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const Editorz = (props) => {
  const { id, data, setData, height, label, errors = {} } = props;

  return <TinyMceEditor data={data} label={label} setData={setData} height={height} mess={errors[id]?.message} />;
};

export default Editorz;
