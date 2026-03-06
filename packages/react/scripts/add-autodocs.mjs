import fs from 'fs';
import path from 'path';

const UI_DIR = path.resolve('src/components/ui');

// Map of [folder, primaryComponent, description]
const COMPONENTS = [
  ['accordion', 'Accordion', 'A vertically stacked set of interactive headings that reveal content.'],
  ['alert', 'Alert', 'Displays a callout for important information.'],
  ['alert-dialog', 'AlertDialog', 'A modal dialog that interrupts the user to confirm a critical action.'],
  ['aspect-ratio', 'AspectRatio', 'Displays content within a desired ratio.'],
  ['avatar', 'Avatar', 'An image element with a fallback for representing the user.'],
  ['badge', 'Badge', 'Displays a badge or a component that looks like a badge.'],
  ['breadcrumb', 'Breadcrumb', 'Displays the path to the current page in a hierarchy of links.'],
  ['button', 'Button', 'Displays a button or a component that looks like a button.'],
  ['calendar', 'Calendar', 'A date picker component with month navigation.'],
  ['card', 'Card', 'Displays a card with header, content, and footer.'],
  ['carousel', 'Carousel', 'A carousel with motion and swipe gestures built on Embla.'],
  ['checkbox', 'Checkbox', 'A control that allows the user to toggle between checked and unchecked.'],
  ['collapsible', 'Collapsible', 'An interactive component which expands and collapses content.'],
  ['command', 'Command', 'A command menu with search and keyboard navigation.'],
  ['context-menu', 'ContextMenu', 'Displays a menu activated by right-clicking.'],
  ['dialog', 'Dialog', 'A modal dialog overlaid on the primary window.'],
  ['drawer', 'Drawer', 'A panel that slides in from the edge of the screen.'],
  ['dropdown-menu', 'DropdownMenu', 'Displays a menu triggered by a button.'],
  ['hover-card', 'HoverCard', 'A card that appears when hovering over a trigger.'],
  ['input', 'Input', 'Displays a form input field.'],
  ['input-otp', 'InputOTP', 'An accessible one-time password input.'],
  ['label', 'Label', 'Renders an accessible label associated with controls.'],
  ['menubar', 'Menubar', 'A horizontal menu bar with dropdown submenus.'],
  ['navigation-menu', 'NavigationMenu', 'A collection of links for site navigation.'],
  ['pagination', 'Pagination', 'Displays pagination with page navigation controls.'],
  ['popover', 'Popover', 'Displays floating content anchored to a trigger.'],
  ['progress', 'Progress', 'Displays an indicator showing the completion progress of a task.'],
  ['radio-group', 'RadioGroup', 'A set of checkable buttons where only one can be checked at a time.'],
  ['scroll-area', 'ScrollArea', 'Augments native scroll functionality with custom scrollbars.'],
  ['select', 'Select', 'Displays a list of options for the user to pick from.'],
  ['separator', 'Separator', 'Visually or semantically separates content.'],
  ['sheet', 'Sheet', 'A panel that slides in from the side, extending the Dialog component.'],
  ['skeleton', 'Skeleton', 'A placeholder loading animation for content.'],
  ['slider', 'Slider', 'An input where the user selects a value from within a range.'],
  ['switch', 'Switch', 'A control that allows the user to toggle between on and off.'],
  ['table', 'Table', 'A responsive table component for displaying data.'],
  ['tabs', 'Tabs', 'A set of layered sections of content shown one at a time.'],
  ['textarea', 'Textarea', 'Displays a form textarea field.'],
  ['toggle', 'Toggle', 'A two-state button that can be toggled on or off.'],
  ['toggle-group', 'ToggleGroup', 'A group of toggle controls meant to be used together.'],
  ['tooltip', 'Tooltip', 'A popup that displays information when hovering over an element.'],
];

let count = 0;

for (const [folder, component, description] of COMPONENTS) {
  const storyPath = path.join(UI_DIR, folder, `${folder}.stories.tsx`);

  if (!fs.existsSync(storyPath)) {
    console.log(`SKIP: ${storyPath} not found`);
    continue;
  }

  let content = fs.readFileSync(storyPath, 'utf-8');

  // Replace untyped Meta with typed Meta<typeof Component>
  // Handle both `const meta: Meta = {` and variations
  content = content.replace(
    /const meta: Meta = \{/,
    `const meta: Meta<typeof ${component}> = {`
  );

  // Replace `type Story = StoryObj` with typed version
  content = content.replace(
    /type Story = StoryObj/,
    `type Story = StoryObj<typeof ${component}>`
  );

  // Add component field and description to meta
  // Find the line with `title: 'UI/...` and add component + description after it
  content = content.replace(
    /(title: 'UI\/[^']+',?)/,
    `$1\n  component: ${component},\n  parameters: {\n    docs: {\n      description: {\n        component: '${description.replace(/'/g, "\\'")}',\n      },\n    },\n  },`
  );

  fs.writeFileSync(storyPath, content);
  count++;
  console.log(`UPDATED: ${folder}/${folder}.stories.tsx`);
}

console.log(`\nDone: ${count} story files updated with autodocs`);
