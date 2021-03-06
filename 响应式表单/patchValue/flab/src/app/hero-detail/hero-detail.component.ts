import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from '../address';

/**
 * 数据模型与表单模型
 * 此刻，表单显示的是空值。 HeroDetailComponent 应该显示一个英雄的值，这个值可能接收自远端服务器。
 * 在这个应用中，HeroDetailComponent 从它的父组件 HeroListComponent 中取得一个英雄。
 * 来自服务器的 hero 就是数据模型，而 FormControl 的结构就是表单模型。
 * 组件必须把数据模型中的英雄值复制到表单模型中。这里隐含着两个非常重要的点。
 * 1.开发人员必须理解数据模型是如何映射到表单模型中的属性的。
 * 2.用户修改时的数据流是从 DOM 元素流向表单模型的，而不是数据模型。
 *
 * 表单控件永远不会修改数据模型。
 * 表单模型和数据模型的结构并不需要精确匹配。
 * 在一个特定的屏幕上，你通常只会展现数据模型的一个子集。
 * 但是表单模型的形态越接近数据模型，事情就会越简单。
 * 在 HeroDetailComponent 中，这两个模型是非常接近的。
 *
 * 使用 setValue() 和 patchValue() 来操纵表单模型
 * 以前，你创建了控件，并同时初始化它的值。
 * 你也可以稍后用 setValue() 和 patchValue() 来初始化或重置这些值。
 *
 * setValue()
 * 借助setValue()，你可以设置每个表单控件的值，只要把与表单模型的属性精确匹配的数据模型传进去就可以了。
 * this.heroForm.setValue({
 *    name:    this.hero.name,
 *    address: this.hero.addresses[0] || new Address()
 * });
 * setValue() 方法会在赋值给任何表单控件之前先检查数据对象的值。
 * 它不会接受一个与 FormGroup 结构不同或缺少表单组中任何一个控件的数据对象。
 * 这种方式下，如果你有什么拼写错误或控件嵌套的不正确，它就能返回一些有用的错误信息。
 * 反之，patchValue() 会默默地失败。
 *
 * 注意，你几乎可以直接把这个 hero 用作 setValue() 的参数，因为它的形态与组件的 FormGroup 结构是非常像的。
 * 你现在只能显示英雄的第一个住址，不过你还必须考虑 hero 完全没有住址的可能性。
 * 就像这个在数据对象参数中对 address 属性进行有条件的设置：
 * address: this.hero.addresses[0] || new Address()
 *
 * patchValue()
 * 借助patchValue()，你可以通过提供一个只包含要更新的控件的键值对象来把值赋给 FormGroup 中的指定控件。
 * 这个例子只会设置表单的 name 控件。
 * this.heroForm.patchValue({
 *    name: this.hero.name
 * });
 * 借助patchValue()，你可以更灵活地解决数据模型和表单模型之间的差异。
 * 但是和 setValue() 不同，patchValue() 不会检查缺失的控件值，并且不会抛出有用的错误信息。
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  heroFrom: FormGroup;

  states = ['CA', 'MD', 'OH', 'VA'];

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.heroFrom.patchValue({
      name: 'Tom'
    });
  }

  ngOnInit() {
  }

  /**
   * 查看 FormControl 的属性
   * 你可以使用 .get() 方法来提取表单中一个单独 FormControl 的状态。
   * 你可以在组件类中这么做，或者通过往模板中添加下列代码来把它显示在页面中，
   * 就添加在 {{form.value | json}} 插值表达式的紧后面：
   * <p>Name value: {{ heroForm.get('name').value }}</p>
   * 要点取得 FormGroup 中的 FormControl 的状态，使用点语法来指定到控件的路径。
   * <p>Street value: {{ heroForm.get('address.street').value}}</p>
   *
   * 你可以使用此技术来显示 FromControl 的任意属性，代码如下：
   * myControl.value
   * FormControl 的值。
   *
   * myControl.status
   * FormControl 的有效性。可能的值有 VALID、INVALID、PENDING 或 DISABLED。
   *
   * myControl.pristine
   * 如果用户尚未改变过这个控件的值，则为 true。它总是与 myControl.dirty 相反。
   *
   * myControl.untouched
   * 如果用户尚未进入这个 HTML 控件，也没有触发过它的 blur（失去焦点）事件，则为 true。 它是 myControl.touched 的反义词。
   */
  private createForm() {
    this.heroFrom = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group(new Address()),
      power: '',
      sidekick: ''
    });
  }
}
