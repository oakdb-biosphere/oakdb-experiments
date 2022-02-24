extern crate colorful;
extern crate base64;

// use std::str;
use clap::Parser;
use colorful::Color;
use colorful::Colorful;

// Simple program to greet a person
#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
  // Name of the person to greet
  #[clap(short, long)]
  name: String,

  // Number of times to greet
  #[clap(short, long, default_value_t = 1)]
  count: u8,
}

fn print_logo() {
  // let bytes = base64::decode("4pWt4pSB4pSB4pSB4pWu4pWx4pWx4pWt4pWu4pWx4pWt4pSB4pSB4pSB4pSz4pSB4pSB4pWuCuKUg+KVreKUgeKVruKUg+KVseKVseKUg+KUg+KVseKVsOKVruKVreKVruKUg+KVreKVruKUgwrilIPilIPilbHilIPilKPilIHilIHilKvilIPila3ila7ilIPilIPilIPilIPilbDila/ilbDila4K4pSD4pSD4pWx4pSD4pSD4pWt4pWu4pSD4pWw4pWv4pWv4pSD4pSD4pSD4pSD4pWt4pSB4pWu4pSDCuKUg+KVsOKUgeKVr+KUg+KVreKVruKUg+KVreKVruKUs+KVr+KVsOKVr+KUg+KVsOKUgeKVr+KUgwrilbDilIHilIHilIHilLvila/ilbDilLvila/ilbDilLvilIHilIHilIHilLvilIHilIHilIHila8=").unwrap();
  let bytes = base64::decode("ICAgXyxnZ2dnZ2csXyAgICAgICAgICAgICAgICAgICAgICAsZ2dnZ2dnZ2dnZ2dnLCAgICAsZ2dnZ2dnZ2dnZ2csCiAsZDhQIiJkOFAiWThiLCAgICAgICAgICAgICAsZFBZYixkUCIiIjg4IiIiIiIiWThiLCBkUCIiIjg4IiIiIiIiWTgsCixkOCcgICBZOCAgICI4YixkUCAgICAgICAgICBJUCdgWWJZYiwgIDg4ICAgICAgIGA4YixZYiwgIDg4ICAgICAgYDhiCmQ4JyAgICBgWWJhYWFkODhQJyAgICAgICAgICBJOCAgOEkgYCIgIDg4ICAgICAgICBgOGIgYCIgIDg4ICAgICAgLDhQCjhQICAgICAgIGAiIiIiWTggICAgICAgICAgICBJOCAgOGJnZywgIDg4ICAgICAgICAgWTggICAgIDg4YWFhYWQ4UCIKOGIgICAgICAgICAgICBkOCAgLGdnZ2csZ2cgIEk4IGRQIiAiOCAgODggICAgICAgICBkOCAgICAgODgiIiIiWThiYQpZOCwgICAgICAgICAgLDhQIGRQIiAgIlk4SSAgSThkOGJnZ1AiICA4OCAgICAgICAgLDhQICAgICA4OCAgICAgIGA4YgpgWTgsICAgICAgICAsOFAnaTgnICAgICw4SSAgSThQJyAiWWIsICA4OCAgICAgICAsOFAnICAgICA4OCAgICAgICw4UAogYFk4YiwsX18sLGQ4UCcsZDgsICAgLGQ4YiwsZDggICAgYFliLCA4OF9fX19fXyxkUCcgICAgICA4OF9fX19fLGQ4JwogICBgIlk4ODg4UCInICBQIlk4ODg4UCJgWTg4OFAgICAgICBZODg4ODg4ODg4OFAiICAgICAgIDg4ODg4ODg4UCI=").unwrap();
  // let logo = str::from_utf8(&bytes).unwrap();
  let logo = String::from_utf8_lossy(&bytes);
  println!("");
  println!("{}", logo.gradient_with_color(Color::Green, Color::BlueViolet));
  println!("");
  println!("    > Version: 0.1.0");
  println!("    > {}", format!("\x1b]8;;{}\x07{}\x1b]8;;\x07", "https://oakdb.app", "Get Started"));
  println!("    > Ready!");
  println!("");
}

fn greet(name: &str, count: u8) {
  let mut str_list: String = "".to_owned();
  for _ in 0..count {
    let str0 = format!("Hello {}!\n", name);
    str_list.push_str(&str0);
  }
  println!("{}", str_list.gradient(Color::Aquamarine3));
}

fn main() {
  let args = Args::parse();
  // println!("\x1b[93mError\x1b[0m");
  print_logo();
  greet(args.name.as_str(), args.count);
}