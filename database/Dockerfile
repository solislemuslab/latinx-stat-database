FROM mysql:5.7
EXPOSE 3306
RUN echo "[mysqld]" >> /etc/mysql/my.cnf
RUN echo "innodb_use_native_aio=0" >> /etc/mysql/my.cnf
RUN echo "innodb_buffer_pool_size=10M" >> /etc/mysql/my.cnf
RUN echo "innodb_log_file_size=1000M" >> /etc/mysql/my.cnf