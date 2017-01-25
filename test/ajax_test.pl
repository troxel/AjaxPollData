#!/usr/bin/perl

use Data::Dumper; 
my $time_curr = scalar localtime(); 

print "Content-type: text/html\n\n";

print qq/{"time_curr":"$time_curr"}/; 

