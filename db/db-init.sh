echo "Creating the iFLUX user"
gosu postgres psql -U postgres -c "CREATE USER $IFLUX_PG_DB_USER PASSWORD '${DB_PASS}'"

echo "Creating the iFLUX database"
gosu postgres createdb -U postgres -O $IFLUX_PG_DB_USER $IFLUX_PG_DB_NAME
