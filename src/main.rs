use iced::executor;
#[allow(unused_imports)]
use iced::{
    alignment, button, scrollable, slider, text_input, Application, Alignment, Button, Checkbox, Color,
    Column, Container, ContentFit, Command, Element, Image, Length, Radio, Row, Sandbox,
    Scrollable, Settings, Slider, Space, Text, TextInput, Toggler,
};

use native_dialog::FileDialog;
use faerber::palettize;

pub fn main() -> iced::Result {
    Faerber::run(Settings::default())
}

#[derive(Debug)]
enum Faerber {
    Fresh {
        upload: button::State,
    },
    Finished {
        upload: button::State,
    },
}


#[derive(Debug, Clone)]
enum Message {
        Completed(Result<(),Error>),
        ButtonPressed,
}



impl Application for Faerber {
    type Executor = executor::Default;
    type Message = Message;
    type Flags = ();

    
    fn new(_flags: ()) -> (Faerber, Command<Message>) {
        (
            Self::Fresh {
                upload: button::State::new(),
            },
            Command::none(),
        )
    }

    fn title(&self) -> String {
        String::from("Farbenfroh")
    }
    
    fn update(&mut self, message: Self::Message) -> Command<Message> {
        match message {
            Message::ButtonPressed => {
                println!("Button pressed");
                let path = FileDialog::new()
                    .set_location("~")
                    .add_filter("PNG Image", &["png"])
                    .add_filter("JPEG Image", &["jpg", "jpeg"])
                    .show_open_single_file()
                    .unwrap();
                match path {
                    Some(path) => {
                        println!("File selected: {:?}", path);
                        //palettize(path.to_str(), "latte", "result.png");
                        Command::perform(magic(path.display().to_string()), Message::Completed)
                    },
                    None => Command::none(),
                }
            },
            Message::Completed(Ok(())) => {
                println!("Completed");
                *self = Self::Finished { upload: button::State::new() };
                Command::none()
            }
            Message::Completed(Err(_error)) => {
                println!("Error");
                Command::none()
            }
        }
    }
    
        fn view(&mut self) -> Element<Self::Message> {
            let content = match self { 
                Self::Fresh {upload} => Column::new()
                    .padding(20)
                    .align_items(Alignment::Center)
                    .push(
                        Text::new("faerber!")
                        .size(100)
                    )
                    .push(  
                        Button::new(upload, Text::new("Upload"))
                            .on_press(Message::ButtonPressed),
                    ),
                Self::Finished {upload} => Column::new()
                        .padding(20)
                        .align_items(Alignment::Center)
                        .push(
                            Text::new("faerber!")
                            .size(100)
                        )
                        .push(  
                            Button::new(upload, Text::new("Upload"))
                                .on_press(Message::ButtonPressed),
                        )
                        .push(
                            Image::new("result.png")
                        ),
            };
        Container::new(content)
            .width(Length::Fill)
            .height(Length::Fill)
            .center_x()
            .center_y()
            .into()
    }
}

async fn magic(path: String) -> Result<(), Error> {
    palettize(path, "latte", "result.png");
    Ok(())
}

#[derive(Debug,Clone)]
enum Error {}