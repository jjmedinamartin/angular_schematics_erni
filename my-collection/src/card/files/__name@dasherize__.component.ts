import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: './<%=dasherize(name)%>.component.html',
  styleUrls: ['./<%=dasherize(name)%>.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class <%= classify(name) %>Component {

  @Input() public title: string;
  @Input() public content: string;
  @Input() public buttonText: string;
}
