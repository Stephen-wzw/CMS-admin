import {
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Button,
  Input,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  Loading,
  Backtop,
  Form,
  FormItem,
  Table,
  TableColumn,
  Avatar,
  Tag,
  Dialog,
  MessageBox,
  Message,
} from "element-ui";

const element = {
  install: function (Vue) {
    Vue.use(Row);
    Vue.use(Col);

    Vue.use(Container);
    Vue.use(Header);
    Vue.use(Aside);
    Vue.use(Main);
    Vue.use(Footer);

    Vue.use(Dropdown);
    Vue.use(DropdownItem);
    Vue.use(DropdownMenu);
    Vue.use(Button);

    Vue.use(Input);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(DatePicker);

    Vue.use(Backtop);

    Vue.use(Tag);
    Vue.use(Dialog);

    Vue.use(Form);
    Vue.use(FormItem);

    Vue.use(Table);
    Vue.use(TableColumn);

    Vue.use(Avatar);
    Vue.use(Menu);
    Vue.use(MenuItem);
    Vue.use(Loading.directive);

    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$message = Message;
  },
};

export default element;
