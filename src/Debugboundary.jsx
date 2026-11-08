import React from 'react';

// ԺԱՄԱՆԱԿԱՎՈՐ՝ միայն սխալի աղբյուրը գտնելու համար։ Երբ սխալը լուծվի, հանիր։
// Եթե որևէ կոմպոնենտ սխալ է նետում render-ի ժամանակ, էջում (և console-ում) ցույց է տալիս
// այն կոմպոնենտների շղթան, որտեղ ընկավ։ Առաջին 2-3 տողերը հենց մեղավորն են։
export class DebugBoundary extends React.Component {
  state = { error: null, stack: '' };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    const stack = (info?.componentStack || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 10)
      .join('\n');
    console.error('DEBUG BOUNDARY\n' + error.message + '\n\n' + stack);
    this.setState({ stack });
  }

  render() {
    if (this.state.error) {
      return (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            margin: 16,
            padding: 16,
            background: '#fff3f3',
            color: '#900',
            border: '1px solid #f5c2c2',
            borderRadius: 8,
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          {String(this.state.error.message)}
          {'\n\nURL: ' + window.location.pathname}
          {'\n\n' + this.state.stack}
        </pre>
      );
    }
    return this.props.children;
  }
}