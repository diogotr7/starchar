#![allow(dead_code)]

use chf_rs_lib::chf::Chf;
use deku::prelude::*;
use std::io::Write;
use std::path::Path;

fn main() {
    env_logger::init();

    let pattern = "C:/Development/StarCitizen/StarBreaker/research/websiteCharacters/**/*.bin";

    std::fs::create_dir_all("out").unwrap();

    for entry in glob::glob(pattern).unwrap() {
        let entry = entry.unwrap();
        let path = entry.as_path();
        let data = std::fs::read(path).unwrap();
        let (rest, chf_data) = Chf::from_bytes((data.as_ref(), 0)).unwrap();

        assert_eq!(
            (chf_data.total_itemport_count - 1) as u32,
            chf_data.itemport.total_count()
        );

        let data_again = Chf::to_bytes(&chf_data).unwrap();

        assert_eq!(rest.0.len(), 0);
        assert_eq!(data, data_again);

        let path = Path::new("out").join(path.with_extension("json").file_name().unwrap());
        println!("Writing to {:?}", path);
        let mut file = std::fs::File::create(path).unwrap();
        writeln!(file, "{}", serde_json::to_string_pretty(&chf_data).unwrap()).unwrap();
    }
}
