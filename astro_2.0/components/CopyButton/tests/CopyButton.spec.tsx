/* eslint-disable @typescript-eslint/ban-ts-comment */

import { render } from 'jest/testUtils';
import { fireEvent } from '@testing-library/dom';

import { CopyButton } from 'astro_2.0/components/CopyButton';

describe('copy button', () => {
  const originalClipboard = { ...global.navigator.clipboard };

  beforeAll(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    };

    // @ts-ignore
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    // @ts-ignore
    global.navigator.clipboard = originalClipboard;
  });

  it('Should render component', () => {
    const { container } = render(
      <CopyButton text="Copy Me!" title="My Title" />
    );

    expect(container).toMatchSnapshot();
  });

  it('Should copy text by click', async () => {
    const title = 'title';
    const component = render(<CopyButton text="Copy Me!" title={title} />);

    fireEvent.click(component.getByText(title));

    expect(navigator.clipboard.writeText).toBeCalledWith('Copy Me!');
  });
});

/* eslint-enable @typescript-eslint/ban-ts-comment */