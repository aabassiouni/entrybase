use clerk_rs::{
    apis::jwks_api::Jwks,
    clerk::Clerk,
    validators::authorizer::{validate_jwt, ClerkError},
};

pub async fn get_auth(clerk_client: Clerk, token: &String) -> Result<String, ClerkError> {
    let jwks: clerk_rs::apis::jwks_api::JwksModel = match Jwks::get_jwks(&clerk_client).await {
        Ok(val) => val,
        Err(_) => {
            return Err(ClerkError::InternalServerError(
                "Failed to retrieve JWKS".to_string(),
            ));
        }
    };

    let user_id = match validate_jwt(&token, jwks) {
        Ok((success, claims)) => {
            println!("Success: {:?}", success);
            println!("Claims: {:?}", claims);
            claims.sub
        }
        Err(e) => {
            println!("Unauthorized: {:?}", e);
            return Err(ClerkError::Unauthorized("Unauthorized".to_string()));
        }
    };

    Ok(user_id)
}
