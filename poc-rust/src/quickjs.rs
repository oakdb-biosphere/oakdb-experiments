use quick_js::Context;

pub fn main() {
  let context = Context::new().unwrap();

  let value = context.eval("1 + 2").unwrap();
  println!("js: 1 + 2 = {:?}", value);

  context
    .add_callback("myCallback", |a: i32, b: i32| a + b * b)
    .unwrap();

  let value = context.eval(
r#"
  function foobar(a, b) {
    return a * 2 + b * 3;
  }
  const x = myCallback(10, 20) + foobar(10, 20);
  x;
"#,
  ).unwrap();
  println!("js: callback = {:?}", value);
}
