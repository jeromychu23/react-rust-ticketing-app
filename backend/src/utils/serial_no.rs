use chrono::Local;
use sqlx::PgPool;

pub fn get_today_date_key() -> String {
    Local::now().format("%Y%m%d").to_string()
}

pub async fn generate_serial_no(db: &PgPool) -> Result<String, sqlx::Error> {
    let date_key = get_today_date_key();
    let prefix = format!("ADO{}-", date_key);

    let last_serial: Option<String> = sqlx::query_scalar(
        r#"
        SELECT serial_no
        FROM tickets
        WHERE serial_no LIKE $1
        ORDER BY serial_no DESC
        LIMIT 1
        "#,
    )
    .bind(format!("{}%", prefix))
    .fetch_optional(db)
    .await?;

    let next_seq = match last_serial {
        Some(serial) => {
            let seq_part = serial.split('-').nth(1).unwrap_or("000");
            let seq_num: u32 = seq_part.parse().unwrap_or(0);
            seq_num + 1
        }
        None => 1,
    };

    let serial_no = format!("{}{:03}", prefix, next_seq);

    Ok(serial_no)
}